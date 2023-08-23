const client = require("./connection");

// constructor
const Deal = function (deal) {
};

Deal.create = (data) => {
    data.status = 1;
    return new Promise((resolve, reject) => {
        client.query("INSERT INTO deal SET ?",
            [data], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
    })
};

Deal.edit = (id, data) => {
    return new Promise((resolve, reject) => {
        client.query("UPDATE deal SET ? WHERE id=?",
            [data, id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows.changedRows < 1) {
                    reject({ message: "Not updated" })
                    return;
                }
                resolve(rows);
            });
    });
};

Deal.find = (data) => {
    var start_at = data.start_at;
    var length = data.length;
    var filter = [];
    filter.push("start_date <= CURDATE()")
    if (data.free) filter.push("type='free'")
    if (data.store_id != -1) filter.push(`store_id=${data.store_id}`);
    if (data.category_id.length > 0) filter.push(`category_id IN (${data.category_id.join(",")})`);
    if (data.feature == "commented") filter.push(`(
        CASE
            WHEN ISNULL(A.count_comment) THEN 0
            ELSE A.count_comment
        END
    ) > 0`);
    if (data.feature == "popular") filter.push(`(
        CASE
            WHEN ISNULL(C.count_dislike) THEN B.count_like
            WHEN ISNULL(B.count_like) THEN -1 * C.count_dislike
            ELSE B.count_like - C.count_dislike
        END
    ) > 0`);

    filter = filter.join(" AND ");
    return new Promise((resolve, reject) => {
        client.query(`SELECT deal.*, user.username as username, user.avatar as avatar, store.name as storename,
        CASE
            WHEN ISNULL(A.count_comment) THEN 0
            ELSE A.count_comment
        END AS cnt_comment,
        CASE
            WHEN ISNULL(C.count_dislike) THEN B.count_like
            WHEN ISNULL(B.count_like) THEN -1 * C.count_dislike
            ELSE B.count_like - C.count_dislike
        END AS cnt_like
        FROM deal 
        LEFT JOIN 
        (Select dest_id, count(*) as count_comment
        FROM comment   
        where type='deal'
        GROUP BY dest_id) A ON deal.id = A.dest_id
        LEFT JOIN
        (select dest_id, count(*) as count_like
        From likes
        where type="deal" AND is_like=1
        GROUP BY dest_id) B 
        ON deal.id = B.dest_id
        LEFT JOIN
        (select dest_id, count(*) as count_dislike
        From likes
        where type="deal" AND is_like=0
        GROUP BY dest_id) C 
        ON deal.id = C.dest_id
        LEFT JOIN
        user 
        ON deal.user_id = user.id
        LEFT JOIN
        store 
        ON deal.store_id = store.id
        WHERE ${filter} ORDER BY start_date DESC LIMIT ? OFFSET ?;`,
            [length, start_at],
            (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows.length == 0) {
                    reject({ message: "not found" })
                    return
                }
                resolve(rows);
            });
    });
}

Deal.count = (data) => {
    var filter = [];
    if (data.free) filter.push("type='free'")
    if (data.store_id != -1) filter.push(`store_id=${data.store_id}`);
    if (data.category_id.length > 0) filter.push(`category_id IN (${data.category_id.join(",")})`);
    if (data.feature == "commented") filter.push(`(
        CASE
            WHEN ISNULL(A.count_comment) THEN 0
            ELSE A.count_comment
        END
    ) > 0`);
    if (data.feature == "popular") filter.push(`(
        CASE
            WHEN ISNULL(C.count_dislike) THEN B.count_like
            WHEN ISNULL(B.count_like) THEN -1 * C.count_dislike
            ELSE B.count_like - C.count_dislike
        END
    ) > 0`);
    if (filter.length > 0) filter = filter.join(" AND ");
    else filter = "1=1";
    return new Promise((resolve, reject) => {
        client.query(`SELECT count(*) as cnt_deal
        FROM deal 
        LEFT JOIN 
        (Select dest_id, count(*) as count_comment
        FROM comment   
        where type='deal'
        GROUP BY dest_id) A ON deal.id = A.dest_id
        LEFT JOIN
        (select dest_id, count(*) as count_like
        From likes
        where type="deal" AND is_like=1
        GROUP BY dest_id) B 
        ON deal.id = B.dest_id
        LEFT JOIN
        (select dest_id, count(*) as count_dislike
        From likes
        where type="deal" AND is_like=0
        GROUP BY dest_id) C 
        ON deal.id = C.dest_id
        WHERE ${filter};`,
            (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows.length == 0) {
                    reject({ message: "not found" })
                    return
                }
                resolve(rows);
            });
    });
};

Deal.get = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM deal WHERE id=?",
            [id],
            (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows.length == 0) {
                    reject({ message: "Deal Not Found" })
                    return
                }
                resolve(rows);
            });
    });
};

Deal.getCode = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM deal WHERE id=?",
            [id],
            (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows.length == 0) {
                    reject({ message: "Deal Not Found" })
                    return
                }
                let countOfUsed = rows[0].count_of_used + 1;
                client.query("UPDATE deal SET count_of_used=? WHERE id=?",
                [countOfUsed, id], (err, row) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(row)
                })
            });
    });
};

module.exports = Deal;