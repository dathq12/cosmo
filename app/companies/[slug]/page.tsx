import { notFound } from "next/navigation";

import { CompanyPageTemplate } from "@/components/CompanyPageTemplate";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { companies, getCompany } from "@/data/site-data";

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export default function CompanyPage({
  params
}: {
  params: { slug: string };
}) {
  const company = getCompany(params.slug);

  if (!company) {
    notFound();
  }

  return (
    <>
      <Header />
      <CompanyPageTemplate company={company} />
      <Footer />
    </>
  );
}
