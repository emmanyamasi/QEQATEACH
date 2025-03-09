var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const fetchBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = "") {
    try {
        const response = yield fetch(`http://localhost:3000/api/books${query}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            const errorText = yield response.text();
            throw new Error(`error ${response.status}:${errorText}`);
        }
        const data = yield response.json();
        console.log("Data received from API:", data); // Debugging
        return data; // Ensure it always returns an array even if the api respose format is unexepcted
    }
    catch (error) {
        console.error("Error fetching books:", error);
        return []; // Return an empty array if fetch fails
    }
});
export const fetchBooksFilter = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = "") {
    try {
        const response = yield fetch(`http://localhost:3000/api/books/filter${query}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            const errorText = yield response.text();
            throw new Error(`error ${response.status}:${errorText}`);
        }
        const data = yield response.json();
        console.log("Data received from API:", data); // Debugging
        return data; // Ensure it always returns an array even if the api respose format is unexepcted
    }
    catch (error) {
        console.error("Error fetching books:", error);
        return []; // Return an empty array if fetch fails
    }
});
export const fetchBooksSortP = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = "") {
    try {
        const response = yield fetch(`http://localhost:3000/api/books/sortP${query}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            const errorText = yield response.text();
            throw new Error(`error ${response.status}:${errorText}`);
        }
        const data = yield response.json();
        console.log("Data received from API:", data); // Debugging
        return data; // Ensure it always returns an array even if the api respose format is unexepcted
    }
    catch (error) {
        console.error("Error fetching books:", error);
        return []; // Return an empty array if fetch fails
    }
});
export const fetchBooksSortY = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = "") {
    try {
        const response = yield fetch(`http://localhost:3000/api/books/sortY${query}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            const errorText = yield response.text();
            throw new Error(`error ${response.status}:${errorText}`);
        }
        const data = yield response.json();
        console.log("Data received from API:", data); // Debugging
        return data; // Ensure it always returns an array even if the api respose format is unexepcted
    }
    catch (error) {
        console.error("Error fetching books:", error);
        return []; // Return an empty array if fetch fails
    }
});
//# sourceMappingURL=events.js.map