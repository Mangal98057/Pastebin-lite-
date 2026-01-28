
const Paste = require("../models/Paste");

const getNow = (req) => {
  if (process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]) {
    return new Date(parseInt(req.headers["x-test-now-ms"]));
  }
  return new Date();
};

exports.createPaste = async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;
  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  const expiresAt = ttl_seconds ? new Date(Date.now() + ttl_seconds * 1000) : null;

  const paste = await Paste.create({
    content,
    expiresAt,
    maxViews: max_views ?? null
  });

  res.json({
    id: paste._id,
    url: `${process.env.APP_URL}/p/${paste._id}`
  });
};

exports.getPaste = async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (!paste) return res.status(404).json({ error: "Not found" });

  const now = getNow(req);
  if ((paste.expiresAt && now > paste.expiresAt) ||
      (paste.maxViews && paste.views >= paste.maxViews)) {
    return res.status(404).json({ error: "Unavailable" });
  }

  paste.views += 1;
  await paste.save();

  res.json({
    content: paste.content,
    remaining_views: paste.maxViews ? paste.maxViews - paste.views : null,
    expires_at: paste.expiresAt
  });
};
