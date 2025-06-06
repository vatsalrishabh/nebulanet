import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import React from 'react'
import AdminGalleryOne from './AdminGalleryOne';

const RightGallery = () => {

    const breadcrumbLinks = [
        { label: "Admin", href: "/admin" },
        // { label: "Manage Orders", href: "/admin/manageorder" },
      ];

  return (
    <div className='lg:w-[84%] z-50 w-full absolute right-0 h-[100vh] bg-slate-200 p-6'>
        <div className="p-4">
    <AdminBreadCrumbs links={breadcrumbLinks} name="Gallery" />    {/*only the breadcrumbs */}

    <AdminGalleryOne/>  {/*upload, delete, add new, edit pictures, productId, availabiliyt size wise */} 
  
      </div>
      
    </div>
  )
}

export default RightGallery
