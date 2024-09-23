"use client"
import Spinner from "@/components/Spinner";
import { getLocations } from "@/helpers/graphql/queries";
import { useQuery } from '@apollo/client';
import Image from "next/image";

// export const metadata: Metadata = {
//   title: 'Kenil was here'
// }

type LocationDataType = {
  id: string
  name: string
  description: string
  photo: string
}

const Home = () => {

  const { loading, error, data } = useQuery(getLocations);

  if (loading) return <Spinner />
  if (error) return <h1 className="text-2xl">Error: {error.message}</h1>

  console.log('error', error)
  console.log('dataaaaa', data)

  return (
    <main className="container grid grid-cols-3 gap-y-6 gap-x-7 max-w-screen-xl mx-auto my-5">
      {data.locations.map(({ id, name, description, photo }: LocationDataType) => (
        <div key={id} className="border-2 p-3 rounded-md">
          <h3 className="text-2xl font-semibold">{name}</h3>
          <Image width={400} height={250} alt="location-reference" src={photo} />
          <br />
          <b>About this location:</b>
          <p>{description}</p>
        </div>
      ))}
    </main>
  )
}

export default Home