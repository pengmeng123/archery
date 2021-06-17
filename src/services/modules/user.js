import { AREA_LIST } from "@/config/api";
import http from "@/utils/http";
export const getAreaList = () => http.get(AREA_LIST);
