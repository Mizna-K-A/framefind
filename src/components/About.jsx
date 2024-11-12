import React from 'react'
import Header from './Header'

const About = () => {
    return (
        <>
            <Header />
            <div className='font d-flex flex-column justify-content-center align-items-center m-5'>
                <h1>About FrameFind</h1>
                <p>FrameFind is a web app designed to help filmmakers, photographers, and content creators discover unique and scenic locations for their projects. It provides access to both public, often hidden locations and private, owner-listed spots, giving users a diverse range of options to suit various creative needs. Whether you're filming a short film, setting up a photography shoot, or scouting for a unique scene, FrameFind's curated location listings can streamline your search.</p>
                <div className='border rounded shadow m-3 p-3'>
                    <h2>Key Features</h2>
                    <ol>
                        <li>Diverse Location Types: Find both public locations, often unknown and hidden gems, as well as private, owner-managed locations available for exclusive access.</li>
                        <li>User-Friendly Search: Advanced search filters allow users to find locations that match specific visual aesthetics, types (urban, rural, coastal, etc.), and amenities.</li>
                        <li>Location Details and Media: Each listing includes detailed descriptions, high-quality images, and sometimes video previews, providing a clear idea of each spot’s potential.</li>
                        <li>Direct Contact and Booking Options: For private locations, users can directly contact owners or managers to discuss availability, rental terms, and permissions.</li>
                        <li>Location Sharing for Creatives: Users can contribute their own discoveries, sharing new public locations to support the creative community.</li>
                    </ol>
                </div>
                <p>FrameFind simplifies the location-scouting process, allowing creators to focus more on their art and less on logistics.</p>
            </div>
        </>
    )
}

export default About