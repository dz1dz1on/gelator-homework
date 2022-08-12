import moment from "moment";

export const futureDate = moment().add(1, "M").format("YYYY-MM-DD").toString();
