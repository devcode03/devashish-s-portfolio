// Certification_data =

import ReadMore from "./readmore";
import { useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";




const cert_data = [

    {
        id: 1,
        title: "Claude Certified Associate - Foundations",
        img: "/assets/claude-certified-associate-foundations.png",
        IssuingOrganization: "Anthropic",
        desc: "The Claude Certified Associate – Foundations credential is designed for client-facing and delivery practitioners. Earners can apply Claude to everyday business tasks, evaluate and refine its output, select the right products and models, and use Claude responsibly.",
        CredentialUrl: "https://www.credly.com/badges/f7939937-cb76-4ab9-98a2-d4a4aaab8aa8/public_url"
    },
    {
        id: 2,
        title: "Microsoft Certified: Azure Fundamentals",
        img: "/assets/microsoft-certified-fundamentals-badge.svg",
        IssuingOrganization: "Microsoft",
        desc: "Describe cloud concepts. Describe Azure architecture and services. Describe Azure management and governance.",
        CredentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/SurveDevashish-4677/46B32C7FDE13673A?sharingId=1D8734801C556BF"
    },
    {
        id: 3,
        img: "/assets/cloud-digital-leader-certification.png",
        title: "Cloud Digital Leader Certification",
        IssuingOrganization: "Google Cloud",
        desc: "A Cloud Digital Leader can articulate the capabilities of Google Cloud core products and services and how they benefit organizations. They can also describe common business use cases and how cloud solutions support an enterprise.This certification is for anyone who wishes to demonstrate their knowledge of cloud computing basics and how Google Cloud products and services can be used to achieve an organization’s goals.",
        CredentialUrl: "https://www.credly.com/badges/ef558c61-2e3c-4a54-82f8-0326ede5c108/public_url"
    }, {
        id: 4,
        img: "/assets/microsoft-certified-fundamentals-badge.svg",
        title: "Microsoft Certified: Azure AI Fundamentals",
        IssuingOrganization: "Microsoft",
        desc: "Identify AI concepts and capabilities. Implement AI solutions with Microsoft Foundry",
        CredentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/SurveDevashish-4677/498B425264F6FED0?sharingId=1D8734801C556BF"
    }
]

export default function CertificationCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", duration: 40 });
    const slides = [...cert_data, ...cert_data];

    const prev = () => emblaApi && emblaApi.scrollPrev();
    const next = () => emblaApi && emblaApi.scrollNext();


    return (
        <section className="min-h-screen py-20 px-4" id="Certifications">
            <div className="max-w-6xl mx-auto">

                <div className="mb-12">
                    <div className="flex items-center space-x-3 mb-4">
                        <Award className="text-pink-500" size={32} />
                        <h2 className="text-4xl font-bold text-white font-mono">$ gpg --verify certificates</h2>
                    </div>
                    <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                </div>
                <div className="group relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {slides.map((b, i) => (
                                <div key={`${b.id}-${i}`}
                                    className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
                                    <div className="card h-64 sm:h-80 md:h-96 lg:h-[30rem] overflow-hidden rounded-xl border-4 border-s-purple-600 flex flex-col items-center pb-3" >
                                        <img className="h-1/2 shrink-0 w-full object-contain bg-[#F4F3EE] p-2" src={b.img} alt={b.title} />
                                        <h3 className="pt-3 pb-1 px-1 text-center" >{b.title}</h3>
                                        <div className="pt-3 pb-1 px-3 font-mono">
                                            <p className="text-base text-purple-400 font-semibold">{b.IssuingOrganization}</p>
                                            <ReadMore className="text-[0.75rem]" maxLength={100}>{b.desc}</ReadMore>
                                        </div>
                                        <a
                                            href={b.CredentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-mono text-sm transition-colors duration-200"
                                        >
                                            <span>Show Credentials</span>
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 rounded-r-xl bg-linear-to-l from-black/80 to-transparent" />
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute inset-y-0 left-0 z-20 flex w-12 items-center justify-center rounded-l-xl bg-black/50 text-white/70 opacity-0 transition group-hover:opacity-100 hover:bg-black/70 hover:text-white"
                    >
                        <ChevronLeft className="transition-transform hover:scale-125" size={32} />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute inset-y-0 right-0 z-20 flex w-12 items-center justify-center rounded-r-xl bg-black/50 text-white/70 opacity-0 transition group-hover:opacity-100 hover:bg-black/70 hover:text-white"
                    >
                        <ChevronRight className="transition-transform hover:scale-125" size={32} />
                    </button>
                </div>
            </div>
        </section>
    );
}
