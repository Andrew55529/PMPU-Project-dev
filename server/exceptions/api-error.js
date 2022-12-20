module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status=status;
        this.errors=errors;
    }

    static UnauthotizedError(debug) {
        console.log(debug);
        return new ApiError(401, 'Пользователь не авторизован'+debug);
    }

    static BadRequest(message, errors = null) {
        return new ApiError(400, message, errors);
    }

    static BadRequest2(message) {
        return new ApiError(400, message);
    }

    static Forbidden(message, errors = []) {
        return new ApiError(403, message, errors);
    }

}