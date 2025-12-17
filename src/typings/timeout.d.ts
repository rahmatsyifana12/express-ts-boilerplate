type TimeoutError = Error & {
    code: 'ETIMEDOUT';
};