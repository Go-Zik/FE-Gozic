import { createGlobalStyle } from "styled-components";
import NotoSansBlack from "./NotoSans-Black.woff2";
import NotoSansBold from "./NotoSans-Bold.woff2";
import NotoSansRegular from "./NotoSans-Regular.woff2";

export default createGlobalStyle`
    @font-face {
        font-family: "NotoSansBlack";
        src: local("NotoSansBlack"),
        url(${NotoSansBlack}) format('woff2');
    }
    @font-face {
        font-family: "NotoSansBold";
        src: local("NotoSansBold"),
        url(${NotoSansBold}) format('woff2');
    }
    @font-face {
        font-family: "NotoSansRegular";
        src: local("NotoSansRegular"),
        url(${NotoSansRegular}) format('woff2');
    }
`;