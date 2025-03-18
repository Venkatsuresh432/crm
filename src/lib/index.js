// place files you want to import through the `$lib` alias in this folder.
import { writable } from "svelte/store";


const isBrowser = typeof window !== "undefined";
let storedUser = null;
if (isBrowser) {
    try {
        storedUser = JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        storedUser = null;
    }
}
export const userStore = writable(storedUser);
if (isBrowser) {
    userStore.subscribe(value => {
        if (value) {
            localStorage.setItem("user", JSON.stringify(value));
        } else {
            localStorage.removeItem("user");
        }
    });
}