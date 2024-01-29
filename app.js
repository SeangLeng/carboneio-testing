const express = require('express');
const fs = require('fs');
const carbone = require('carbone');

const port = 3000;
const app = express();

app.use(express.json());

const generateReport = async (req, res) => {
    const data = {
        number: 123,
        image: "https://asset.cambodia.gov.kh/mptc/media/2020/05/zRz0MYcT-cropped-PTC-HD-LOGO-512px.png",
        day: "ពុធ",
        month: 'កក្កដា',
        year: '២០២៤',
        ministryname: 'ក្រសួង',
        kam: 'មិនមាន',
        resource: 'យាងតាម',
        description: '...your long description here...',
        ministername: 'ពិសិត'
    };

    const { filename } = req.body;

    if (!filename) {
        return res.status(400).json({
            message: "You must provide a filename in the request body."
        });
    }

    var options = {
        convertTo: 'docx' //can be docx, txt, ...
    };

    try {
        carbone.render('./testing-template.odt', data, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }

            fs.writeFileSync(`./output/${filename}.docx`, result);
            res.status(201).json({
                code: 201,
                message: "File generated!"
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

app.post("/generate-report", generateReport);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
