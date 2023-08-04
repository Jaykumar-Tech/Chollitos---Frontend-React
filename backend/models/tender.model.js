const { language } = require('googleapis/build/src/apis/language');
const client = require('./connection');

const Tender = function (tender) {
    this.subject = tender.subject;
    this.seller_id = tender.seller_id;
    this.ctd_id = tender.ctd_id;
    this.country = tender.country;
    this.institution = tender.institution;
    this.service = tender.service;
    this.type = tender.type;
    this.lots = tender.lots;
    this.funding = tender.funding;
    this.language = tender.language;
    this.pagenumber = tender.pagenumber;
    this.deadline = tender.deadline;
    this.updated_at = tender.updated_at;
    this.status = tender.status;
    this.vote = tender.vote;
    this.viewed = tender.viewed;
    this.primary_files = tender.primary_files;
    this.secondary_files = tender.secondary_files;
}
Tender.create = (newTender) => {
    newTender.lots = JSON.stringify(newTender.lots);
    newTender.primary_files = JSON.stringify(newTender.primary_files);
    newTender.secondary_files = JSON.stringify(newTender.secondary_files);

    return new Promise((resolve, reject) => {
        client.query("INSERT INTO tender SET ?", newTender, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: row });
            }
        })
    })

}
Tender.remove = (id, result) => {
    return new Promise((resolve, reject) => {
        client.query("DELETE FROM tender WHERE id = ?", id, (err, res) => {
            if (err) {
                reject(err)
            } else if (res.affectedRows == 0) {
                reject({ kind: "not_found" })
            } else {
                resolve({ data: res });
            }
        });
    });
}
Tender.filter = (filter, orderBy, offset, count) => {
    var query = "SELECT * FROM tender WHERE ? ORDER BY ?";
    var params = [filter, orderBy] ;
    if ( !filter.length ) {
        query = "SELECT * FROM tender ORDER BY ?";
        params = orderBy;
    }
    return new Promise((resolve, reject) => {
        client.query(query, 
        params,
            (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    var res = rows.slice(offset, count);
                    if (res.length == 0) {
                        reject({ message: "not found" })
                    } else {
                        resolve( { data: res })
                    }
                }
            })
    })
}
Tender.findById = (id) => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM tender WHERE id = ${id}`, (err, res) => {
            if (err) {
                reject(err);
            } else if (res.length) {
                resolve({ data: res[0] });
            } else {
                reject({ message: "not found" });
            }
        });
    });
};
Tender.getAll = () => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM tender`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: res });
            }
        });
    });
};
Tender.addVote = (id, result) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM tender WHERE id=?", id,
            (err, tenders) => {
                if (err) {
                    reject(err);
                } else if (tenders.length == 0) {
                    reject({ kind: "not found" });
                } else {
                    var vote = tenders[0].vote + 1;
                    client.query("UPDATE tender SET vote = ? WHERE id = ? ",
                        [vote, id], (err, tender) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve({ data: tender });
                            }
                        })
                }
            })
    })
}
Tender.addView = (id, result) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM tender WHERE id=?", id,
            (err, tenders) => {
                if (err) {
                    reject(err);
                } else if (tenders.length == 0) {
                    reject({ kind: "not found" });
                } else {
                    var view = tenders[0].viewed + 1;
                    client.query("UPDATE tender SET viewed = ? WHERE id = ? ",
                        [view, id], (err, tender) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve({ data: tender });
                            }
                        })
                }
            })
    })
}

module.exports = Tender;