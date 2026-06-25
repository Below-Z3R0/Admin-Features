import { getContent } from "./sections/content.service"

export const getNavbarData = async (lang: string = 'es') => {
    const Navbar = await getContent('navbar', lang)
    return Navbar
}
