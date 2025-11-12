import type { ForwardedRef } from "react";

type Props = {
    textBehindRef: ForwardedRef<HTMLDivElement>;
    textFrontRef: ForwardedRef<HTMLDivElement>;
    textBehindBlurRef: ForwardedRef<HTMLDivElement>;
};

export function Headline({ textBehindRef, textFrontRef, textBehindBlurRef }: Props) {
    return (
        <div className="headline-container">
            <div id="text-behind" ref={textBehindRef}>
                VARCO<br />3D
            </div>
            <div id="text-behind-blur" ref={textBehindBlurRef}>
                VARCO<br />3D
            </div>
            <div id="text-front" ref={textFrontRef}>
                VARCO<br />3D
            </div>
        </div>
    );
}
