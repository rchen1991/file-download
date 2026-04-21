import DownloadIcon from '../assets/download-icon.svg'
import GreenCircleIcon from '../assets/green-circle.svg'

type IconProps = {
    token: string,
    width?: number,
    height?: number,
}

export default function Icon({
    token,
    width,
    height
}: IconProps) {
    let tokenSrc = DownloadIcon
    if (token === 'download') {
        tokenSrc = DownloadIcon
    }

    if (token === 'green-circle') {
        tokenSrc = GreenCircleIcon
    }

    return (
        <img src={tokenSrc} width={width ?? 24} height={height ?? 24} />
    )
}