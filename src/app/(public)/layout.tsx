import { cookies } from "next/headers";
import { Footer } from "@/components/server-components";
import { Navbar } from "@/components/client-components";
import { getFooterData } from "@/services/footer.data.service";
import { getNavbarData } from "@/services/navbar.data.service";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const currentLang = cookieStore.get('lang')?.value || 'es';
  const [navbarData, footerData] = await Promise.all([
    getNavbarData(currentLang),
    getFooterData(currentLang),
  ]);
  return (
    <>
      <Navbar initialData={navbarData} />
      {children}
      <Footer data={footerData} />
    </>
  );
}