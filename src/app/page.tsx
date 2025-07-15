import MainBanner from "@/components/common/MainBanner";
import Header from "@/components/layout/Header";
import QuizList from "@/components/quiz/QuizList";

export default function Home() {
  return (
    <>
      <Header />
      <MainBanner />
      <QuizList />
    </>
  );
}
