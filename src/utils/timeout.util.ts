export function isTimeoutError(error: unknown): error is TimeoutError {
    return (
        error instanceof Error &&
        'code' in error &&
        (error as { code?: unknown }).code === 'ETIMEDOUT'
    );
}
