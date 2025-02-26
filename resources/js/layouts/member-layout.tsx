import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import AppLogoIconImage from '@/components/app-logo-icon-image';
import { Link } from '@inertiajs/react';

interface MemberLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: MemberLayoutProps) => (

    <>
        <div className="w-full h-[85px] bg-gray-100 px-12 py-2">
            <div className="w-full h-full flex flex-row justify-between items-center">
                <div className="">
                    <div className="flex flex-row items-center space-x-2"><AppLogoIconImage className="w-8" /><h1 className="font-bold">Sign Direct Pro</h1></div>
                </div>
                <div className="flex flex-row h-full">
                    <Link href={route('member.product.show', 1)} className="bg-white rounded-md shadow w-16 h-full flex flex-col justify-center items-center py-2 px-4" >
                        <img className="w-full" src="/images/icons/banner/flexible.svg" alt="Flexible "/>
                        <span className="text-sm">Banner</span>
                    </Link>
                </div>
                <div>
                    Side Menu
                </div>
            </div>

        </div>
        {children}
    </>
);
