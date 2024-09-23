"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"

import { getProjectsWithPagination } from "@/helpers/graphql/queries"
import Spinner from "@/components/Spinner"

type Root = {
  projectsConnection: ProjectsConnection
}

type ProjectsConnection = {
  aggregate: Aggregate
  edges: Edge[]
  pageInfo: PageInfo
}

type Aggregate = {
  count: number
}

type Edge = {
  node: ProjectType
  cursor: string
}

type PageInfo = {
  hasNextPage: boolean
  pageSize: number
  hasPreviousPage: boolean
}

export type ProjectType = {
  name: string
  slug: string
  description: string
  image: ImageType[]
}

type ImageType = {
  id: string
  url: string
}

type PaginationInfoType = {
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  pageSize: number
  totalRecordsCount: number
}

const defaultPagination: PaginationInfoType = {
  currentPage: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  pageSize: 2,
  totalRecordsCount: 2
}

const Projects = () => {

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfoType>(defaultPagination)

  const { data, error, loading } = useQuery<Root>(getProjectsWithPagination, {
    variables: {
      skip: paginationInfo.pageSize * (paginationInfo.currentPage)
    }
  })

  useEffect(() => {

    if (data) {
      const { aggregate, pageInfo: { hasNextPage, hasPreviousPage, pageSize } } = data.projectsConnection
      setPaginationInfo({ ...paginationInfo, hasNextPage, hasPreviousPage, pageSize, totalRecordsCount: aggregate.count })
    }

  }, [data])

  if (loading) return <Spinner />
  if (error) return <h1 className="text-2xl">Error: {error.message}</h1>

  const handleNextPage = () => {
    if (paginationInfo.hasNextPage) {
      setPaginationInfo({ ...paginationInfo, currentPage: paginationInfo.currentPage + 1 })
    }
  }

  const handlePreviousPage = () => {
    if (paginationInfo.hasPreviousPage) {
      setPaginationInfo({ ...paginationInfo, currentPage: paginationInfo.currentPage - 1 })
    }
  }

  return (
    <main className="container  my-5 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-3 gap-y-6 gap-x-7">
        {data?.projectsConnection.edges.map(({ node: { description, image, name, slug } }) => (
          <div key={slug} className="border-2 p-3 rounded-md">
            <Link href={`/projects/${slug}`} className="text-2xl font-semibold hover:text-blue-500">{name}</Link>
            <Image width={400} height={250} alt="location-reference" src={image[0].url} />
            <br />
            <p>{description}</p>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-between mt-6">
        <button onClick={handlePreviousPage} disabled={!paginationInfo.hasPreviousPage} className="px-2 py-1 border bg-gray-100 hover:bg-gray-200 disabled:opacity-70 disabled:hover:bg-gray-100">Previous</button>
        <span>{paginationInfo.currentPage}</span>
        <button onClick={handleNextPage} disabled={!paginationInfo.hasNextPage} className="px-2 py-1 border bg-gray-100 hover:bg-gray-200 disabled:opacity-70 disabled:hover:bg-gray-100" >Next</button>
      </div>

    </main>
  )
}

export default Projects