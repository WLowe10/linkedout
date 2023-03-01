import fs from "fs";

export const getSettings = async () => {
    const settings = await fs.readFileSync("../config/config.json", "utf8");
    return JSON.parse(settings);
};
