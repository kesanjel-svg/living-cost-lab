import { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Seo from '../../../shared/seo/Seo'
import HubLayout from '../components/HubLayout'
import { getTopicHubData, getTopicPath } from '../services/topicHubService'
import './TopicHubPage.css'

export default function TopicHubPage() {
  const { slug } = useParams()
  const hub = useMemo(() => getTopicHubData(slug), [slug])

  if (!hub) {
    return <Navigate to="/topics" replace />
  }

  const { topic, breadcrumbs, featured, popular, latest, supports, relatedTopics, blogCount } =
    hub

  return (
    <>
      <Seo
        title={`${topic.title} | 생활비연구소`}
        description={topic.description}
        keywords={`${topic.label}, 생활비, 지원금, ${topic.title}`}
        canonical={getTopicPath(topic.slug)}
        breadcrumbs={breadcrumbs}
      />
      <HubLayout
        topic={topic}
        breadcrumbs={breadcrumbs}
        featured={featured}
        popular={popular}
        latest={latest}
        supports={supports}
        relatedTopics={relatedTopics}
        blogCount={blogCount}
      />
    </>
  )
}
