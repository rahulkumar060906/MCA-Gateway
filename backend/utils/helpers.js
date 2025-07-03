
// Helper for consistent API responses and error formatting
exports.formatError = (err) => {
    if (err.errors) {
        return Object.values(err.errors).map(e => e.message);
    }
    return [err.message || 'Unknown error'];
};
