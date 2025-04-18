export const fetchBooks = async (query: string = "") => {
  try {
    const response = await fetch(`http://localhost:3000/api/books${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`error ${response.status}:${errorText}`);
    }

    const data = await response.json();
    console.log("Data received from API:", data); // Debugging

    return Array.isArray(data) ? data : data.books || []; // Ensure it always returns an array even if the api respose format is unexepcted
  } catch (error) {
    console.error("Error fetching books:", error);
    return []; // Return an empty array if fetch fails
  }
};
