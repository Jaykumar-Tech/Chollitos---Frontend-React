const client = require('./connection');
const fs = require("fs")

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
Tender.create = (newTender, files) => {
    newTender.primary_files = JSON.stringify(files.primary_files.map(file => file.originalname));
    newTender.secondary_files = JSON.stringify(files.secondary_files.map(file => file.originalname));

    return new Promise((resolve, reject) => {
        client.query("INSERT INTO tender SET ?", newTender, (err, row) => {
            if (err) {
                var res_files = [];
                files.primary_files.forEach(file => {
                    const oldPath = file.path;
                    res_files.push(oldPath)
                    fs.unlinkSync(oldPath)
                });
                files.secondary_files.forEach(file => {
                    const oldPath = file.path;
                    res_files.push(oldPath)
                    fs.unlinkSync(oldPath)
                });
                reject({ err: err, res: res_files });
            } else {
                var uploadPath = `${__dirname}/../uploads`;
                // resolve({ data: fs.readdirSync(uploadPath) });
                if (!fs.existsSync(uploadPath))
                    fs.mkdirSync(uploadPath)
                if (!fs.existsSync(`${uploadPath}/${row.insertId}`)) {
                    fs.mkdirSync(`${uploadPath}/${row.insertId}`)
                    fs.mkdirSync(`${uploadPath}/${row.insertId}/primary`)
                    fs.mkdirSync(`${uploadPath}/${row.insertId}/secondary`)
                }
                files.primary_files.forEach(file => {
                    const oldPath = file.path;
                    const newPath = `${uploadPath}/${row.insertId}/primary/${file.originalname}`;
                    fs.renameSync(oldPath, newPath);
                });
                files.secondary_files.forEach(file => {
                    const oldPath = file.path;
                    const newPath = `${uploadPath}/${row.insertId}/secondary/${file.originalname}`;
                    fs.renameSync(oldPath, newPath);
                });
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
    var params = [filter, orderBy];
    if (!filter.length) {
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
                        resolve({ data: res })
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
Tender.addVote = (id) => {
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
Tender.addView = (id) => {
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
Tender.download = (tenderId, isPrimary, index) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM tender WHERE id=?", tenderId,
            (err, tenders) => {
                if (err) reject(err);
                else if (tenders.length == 0) reject({ message: "not found" });
                else {
                    var primary_files = JSON.parse(tenders[0].primary_files);
                    var secondary_files = JSON.parse(tenders[0].secondary_files);

                    if (isPrimary && (primary_files.length < index || index < 1)) {
                        reject({ message: "not found" })
                    } else if (!isPrimary && (secondary_files.length < index || index < 1)) {
                        reject({ message: "not found" })
                    } else {
                        var name = isPrimary ? primary_files[index - 1] : secondary_files[index - 1];
                        var filepath = `${__dirname}/../uploads/${tenderId}/${isPrimary ? "primary" : "secondary"}/${name}`;

                        // const options = {
                        //     headers: {
                        //         'Content-Type': 'application/pdf',
                        //         'Content-Disposition': 'attachment; filename="download.pdf"',
                        //     },
                        // };
                        resolve({
                            data: filepath
                        })
                    };
                }
            }
        )
    })
}

module.exports = Tender;