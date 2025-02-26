import { ImgHTMLAttributes } from 'react';

export default function AppLogoIconImage(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img {...props} src='/images/logo.png' alt="App Logo" />
    );
}
