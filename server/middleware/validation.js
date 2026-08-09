export const validateContactInput = (req, res, next) => {
  let { name, email, subject, message } = req.body || {};

  // Trim incoming strings
  name = typeof name === 'string' ? name.trim() : '';
  email = typeof email === 'string' ? email.trim() : '';
  subject = typeof subject === 'string' ? subject.trim() : '';
  message = typeof message === 'string' ? message.trim() : '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Name validation
  if (!name || name.length < 2 || name.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Please provide your name (between 2 and 100 characters).',
    });
  }

  // Email validation
  if (!email || !emailRegex.test(email) || email.length > 200) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  // Subject handling (optional, defaults if empty)
  if (!subject || subject.length < 2) {
    subject = 'Portfolio Contact Form Message';
  }

  // Message validation
  if (!message || message.length < 10 || message.length > 5000) {
    return res.status(400).json({
      success: false,
      message: 'Message must contain between 10 and 5000 characters.',
    });
  }

  // Attach clean trimmed data to req.body
  req.body = { name, email, subject, message };

  next();
};
