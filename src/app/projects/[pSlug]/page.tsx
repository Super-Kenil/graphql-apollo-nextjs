"use client"
import { getProjectBySlug } from "@/helpers/graphql/queries"
import { useQuery } from "@apollo/client"
import Image from "next/image"
import { ProjectType } from "../page"
import Spinner from "@/components/Spinner"

type ParamsType = {
  params: {
    pSlug: string
  }
}

const SingleProjectView = ({ params }: ParamsType) => {

  const { data, error, loading } = useQuery<{ project: ProjectType }>(getProjectBySlug, {
    variables: {
      slug: params.pSlug
    }
  })

  if (loading) return <Spinner />
  if (error) return <h1 className="text-2xl">Error: {error.message}</h1>

  const { description, image, name } = data!.project

  return (
    <main className="container grid grid-cols-3 gap-y-6 gap-x-7 max-w-screen-xl mx-auto my-5">
      <div className="border-2 p-3 rounded-md">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <Image width={400} height={250} alt="location-reference" src={image[0].url} />
        <br />
        <p>{description}</p>
      </div>
    </main>
  )
}

export default SingleProjectView