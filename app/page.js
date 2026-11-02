import Button from "@/components/Button";
import Card from "@/components/Card";
import { features } from "@/data/dummy";

export default function Landing() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">AI health coach</p>
        <h1 className="h1">Managing a chronic condition, without the overwhelm.</h1>
        <p className="lead">
          VitalCoach turns big health goals into one small, realistic step a day,
          built for people who are busy, tired and always on the move.
        </p>
        <div className="row">
          <Button href="/login">Try the demo</Button>
          <Button href="#how" variant="secondary">
            How it works
          </Button>
        </div>
      </section>

      <section id="how">
        <h2 className="h2">Small improvements that fit your life</h2>
        <div className="grid-3">
          {features.map((f) => (
            <Card key={f.title}>
              <div className="stat-icon" aria-hidden="true">{f.icon}</div>
              <h3 className="h3">{f.title}</h3>
              <p className="muted">{f.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
