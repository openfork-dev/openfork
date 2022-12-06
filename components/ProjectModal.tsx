import { Box, CloseButton, Flex, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

interface upvoteProps {
  user_id: string;
}

interface ProjectProps {
  id: number;
  name: string;
  user?: string;
  owner?: string;
  description: string;
  imgSrc?: any;
  onOpen?: any;
  upvotes?: upvoteProps[];
  upvoteProject?: any;
  github_url?: string;
  tech_stack?: any;
  isUpvoting?: number;
  slug: string;
}

const ProjectModal = ({ isOpen, cardClose, projectId }: any) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any>({});

  const fetchProject = async () => {
    setLoading(true);
    let { data: project }: { data: any } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId);
    console.log(project[0]);
    setProject(project[0]);
    setLoading(false);
  };

  useEffect(() => {
    isOpen && fetchProject();
  }, [projectId]);

  return (
    <>
      <Box
        w={"100%"}
        m={"auto"}
        position={"absolute"}
        top={0}
        h={"400px"}
        bg={"blue.800"}
        zIndex={"modal"}
        display={isOpen ? "flex" : "none"}
        borderRadius={"xl"}
        flexDirection={"column"}
      >
        <CloseButton
          size={"lg"}
          onClick={() => {
            cardClose();
          }}
        />

        <Box w={"90%"} mx={"auto"}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Heading>{project.name}</Heading>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProjectModal;
