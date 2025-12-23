import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/container";
import ContactsCards from "@/components/widgets/contactsCards";

export default function ContactsPage() {
    return (
        <div className="">
            <Container>
                <div className="flex flex-col items-center justify-center">
                    <div className="">
                        <h1 className="text-center xs:text-[40px] sm:text-[80px] font-bold  text-[#4A362A]">
                            Контакты
                        </h1>
                    </div>
                    <div className="">
                        <ContactsCards />
                    </div>
                </div>
            </Container>
        </div>
    );
}
