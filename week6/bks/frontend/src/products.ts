export async function getData<T>(url: string): Promise<T | null> { //Tmeans the function can work with any data type//PROMISE <T/NULL the  returns a promise that either resolves  the T FETCHED DATA OR  RESOLVES TO NULL IF THERE IS AN ERROR

    try {
        const response = await fetch(url); //makes request to url//await  ensures the  function waits  for the  request to complete before movin on

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: T = await response.json(); //converts the responsr into json format T means the  data can  be of any type
    
        console.log("data:", data); //loging data
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    
    }
}







