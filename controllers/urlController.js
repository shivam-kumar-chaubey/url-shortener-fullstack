const Url = require("../models/Url");
const { nanoid } = require("nanoid");

const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    // URL Validation
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        message: "Invalid URL",
      });
    }

    // Existing URL Check
    const existingUrl = await Url.findOne({
      originalUrl: url,
    });

    if (existingUrl) {
      return res.status(200).json({
        message: "URL Already Exists",
        shortUrl: `http://localhost:5000/${existingUrl.shortCode}`,
      });
    }

    // Create New Short URL
    const shortCode = nanoid(6);

    const newUrl = new Url({
      originalUrl: url,
      shortCode,
    });

    await newUrl.save();

    res.status(201).json({
      message: "Short URL Shortened Successfully",
      shortUrl: `http://localhost:5000/${shortCode}`,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const redirectUrl = async (req, res) => {
    try {
        console.log("Short Code:", req.params.shortCode);

        const urlData = await Url.findOne({
            shortCode: req.params.shortCode
        });

        console.log("Database Data:", urlData);

        if (!urlData) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }
        
         urlData.clicks++;

         await urlData.save();
        res.redirect(urlData.originalUrl);

    } catch (error) {
        console.log(error);
    }
};


const getUrlStats = async (req, res) => {
    try {

        const urlData = await Url.findOne({
            shortCode: req.params.shortCode
        });

        if (!urlData) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        res.status(200).json({
            originalUrl: urlData.originalUrl,
            shortCode: urlData.shortCode,
            clicks: urlData.clicks,
            createdAt: urlData.createdAt,
            updatedAt: urlData.updatedAt
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.status(200).json(urls);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const deleteUrl = async (req, res) => {
    try {

        const { id } = req.params;

        await Url.findByIdAndDelete(id);

        res.status(200).json({
            message: "URL Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createShortUrl,
    redirectUrl,
    getUrlStats,
    getAllUrls,
    deleteUrl
};
