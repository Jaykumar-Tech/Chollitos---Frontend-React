const TenderModel = require("../models/tender.model")

exports.updateTender = (tender, id) => {
    return TenderModel.update(tender, {
        where: { id: id } // Specify the condition for the record to update
    });
}

exports.createTender = (tender) => {
    return TenderModel.create(tender);
}

exports.findTenderById = (id) => {
    return TenderModel.findByPk(id);
}

exports.getAllTenders = () => {
    return TenderModel.findAll();
}

exports.deleteTender = (id) => {
    return TenderModel.destroy({
        where: {
            id: id
        }
    });
}

exports.addVote = async (tenderId) => {
    try {
        const tender = await TenderModel.findByPk(tenderId);
        if (tender) {
            tender.vote += 1;
            await tender.save();
            return tender;
        }
        return null;
    } catch (error) {
        throw new Error('Failed to add vote');
    }
};
