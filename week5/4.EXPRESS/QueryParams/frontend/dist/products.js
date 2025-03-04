var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url); //makes request to url//await  ensures the  function waits  for the  request to complete before movin on
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json(); //converts the responsr into json format T means the  data can  be of any type
            console.log("data:", data); //loging data
            return data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    });
}
//# sourceMappingURL=products.js.map