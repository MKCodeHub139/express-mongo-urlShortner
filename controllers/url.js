import { nanoid } from "nanoid";
import Url from "../models/url.js";
async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortId = nanoid(8);
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy:req.user._id
  });
  return res.render('home',{id:shortId});
}
async function handleUrlById(req, res) {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}
async function hanleGetAnalaytics(req, res) {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });
  return res.json({
    click: result.visitHistory.length,
    visitHistory: result.visitHistory,
  });
}
export { handleGenerateShortUrl,handleUrlById, hanleGetAnalaytics };
