import { getContent } from "./sections/content.service"

export const getFooterData = async (lang: string = 'es') => {
    const Footer = await getContent('footer', lang)
    return Footer
}