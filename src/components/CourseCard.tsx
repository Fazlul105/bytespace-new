import type { Course } from '../data/courses'
import Icon from './Icon'
import { AvatarStack } from './Visuals'
export default function CourseCard({
  course,
  onSelect,
  decorative = false,
}: {
  course: Course
  onSelect?: (course: Course) => void
  decorative?: boolean
}) {
  return (
    <article className="course-card" aria-hidden={decorative || undefined}>
      <div className="course-image">
        {!decorative && !onSelect && (
          <a
            className="course-image-link"
            href={`/courses/${course.id}`}
            aria-label={`Open ${course.title}`}
            tabIndex={-1}
          />
        )}
        <img
          src={`/assets/${course.image}`}
          alt={decorative ? '' : course.alt}
          width="682"
          height="454"
          loading="lazy"
        />
        <div className="course-meta">
          <span>17 Lessons</span>
          <span>2 hours 16 mins</span>
          <span>59 Comments</span>
        </div>
      </div>
      <div className="course-title-row">
        <h3>
          {decorative ? (
            course.title
          ) : onSelect ? (
            <button
              onClick={() => onSelect?.(course)}
              aria-label={`View ${course.title}`}
            >
              {course.title}
            </button>
          ) : (
            <a
              href={`/courses/${course.id}`}
              aria-label={`View ${course.title}`}
            >
              {course.title}
            </a>
          )}
        </h3>
        <span className="course-rating" aria-label="Rated 4.5 out of 5">
          4.5 <Icon name="star" />
        </span>
      </div>
      <p className="course-author">
        by{' '}
        {decorative ? (
          <span>purepearl studio</span>
        ) : (
          <a href="/creators/purepearl-studio">purepearl studio</a>
        )}
      </p>
      <div className="course-students">
        <span className="level">
          <Icon name="bars" /> Beginner
        </span>
        <AvatarStack compact />
      </div>
      <p className="course-price">
        <strong>$25</strong>
        <span>/lifetime</span>
      </p>
    </article>
  )
}
