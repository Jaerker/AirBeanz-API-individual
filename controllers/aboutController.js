import nedb from 'nedb-promises';

const aboutDb = nedb.create({
    filename: 'config/about.db',
    autoload: true
});

const aboutInfo = async (req, res) => {
        res.status(200)
            .json({
                success: true,
                message: 'Text found.',
                status: 200,
                data: req.textInfo
            });
    }

export { aboutDb, aboutInfo };