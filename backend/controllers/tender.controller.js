const TenderService = require('../services/auth.service');

exports.addTender = async (req, res) => {
    const tenderData = req.body;
    const tender = await TenderService.createTender(tenderData);
    return res.json({
        data: tender,
        message: 'Tender added successfully.'
    });
}

exports.getTender = async (req, res) => {
    const tender = await TenderService.findTenderById(req.params.tenderId);
    return res.json({
        data: tender,
        message: 'Success.'
    });
}

exports.getAllTenders = async (req, res) => {
    const tenders = await TenderService.getAllTenders();
    return res.json({
        data: tenders,
        message: "Success"
    })
}

exports.deleteTender = async (req, res) => {
    const tenderID = req.params.tenderId;
    await TenderService.deleteTender(tenderID);
    return res.json({
        message: "Success"
    })
}

exports.updateTender = async (req, res) => {
    const tender = await TenderService.findTenderById(req.params.tenderId);
    if (tender) {
        const tenderData = req.body;
        const tenderUpdated = await TenderService.updateTender(tenderData, tender.id);
        return res.json({
            message: 'Tender updated successfully.'
        });
    }
    return res.status(400).json({ message: 'Tender Failed Updating' });
}

exports.addVote = async ( req, res ) => {
    const tender = await TenderService.addVote(req.params.tenderId) ;
    if ( tender ) {
        return res.json({
            message: 'Tender add vote successfully.'
        });
    }
    return res.status(400).json({ message: 'Tender Failed Voting' });
}