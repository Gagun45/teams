import CardWrapper from "@/app/auth/_components/CardWrapper"
import NewTeamForm from "@/components/Forms/NewTeamForm"

const NewTeamPage = () => {
  return (
    <main>
      <CardWrapper cardHeading="Creating new team">
        <NewTeamForm/>
      </CardWrapper>
    </main>
  )
}
export default NewTeamPage