import feather from "feather-icons"

export interface IIndexable {
    [key: string]: any;
}

type IconProps = {
    name: string,
    custom? : boolean,
    style?: any,
    width?: string,
    height?: string,
    color?: string,
    "stroke-width"?: string,
    "stroke-linecap"?: string,
    "stroke-linejoin"?: string,
}

const Icon = ({ name, custom, style, ...props } : IconProps) => {
    return (
        custom ?
        <img src={name} style = { {...style ,...{ height: props?.height, width: props?.width, color: props?.color }} }/> :
        <span
            dangerouslySetInnerHTML={{ __html: (feather.icons as IIndexable)[name].toSvg(props) }}
            style = { style }
        />
    )
}

export default Icon