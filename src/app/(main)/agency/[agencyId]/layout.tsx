
import Unauthorized from "@/components/unauthorized";
import { getNotificationAndUser, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import Sidebar from '@/components/sidebar'
import { redirect } from "next/navigation";
import React from "react";
import BlurPage from "@/components/global/blur-page";
import InfoBar from "@/components/global/infobar";


type Props = {
    children: React.ReactNode
    params:  { agencyId: string }
}

const layout = async ({children, params} : Props) => {
    const agencyId = await verifyAndAcceptInvitation()
    const user = await currentUser()
    if(!user){
        return redirect('/sign-in')
    }
    if(!agencyId){
        return redirect('/agency')
    }
    if(user.privateMetadata.role !== 'AGENCY_OWNER' && user.privateMetadata.role !== 'AGENCY_ADMIN'){
        return <Unauthorized />
    }


    let allNoti:any = []
    const notifications = await getNotificationAndUser(agencyId)
    if(notifications) {allNoti =  notifications}
    

    return(
        <div className="h-screen overflow-hidden">
            <Sidebar
                id={params.agencyId}
                type="agency"
            />
            <div className="md:pl-[300px]">
                <InfoBar notifications={allNoti} />
                <div className="relative">
                   <BlurPage> {children} </BlurPage>
                </div>
            </div>
        </div>
    )



}


export default layout