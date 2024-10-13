import DashboardHeader from '@/app/components/dashboardComponents/DashboardHeader'
import MannageUser from '@/app/components/dashboardComponents/MannageUser'
import React from 'react'

export default function Members() {
    return (
        <>
            <DashboardHeader title='Members' className='mb-2.5' />
            <MannageUser />
        </>
    )
}
