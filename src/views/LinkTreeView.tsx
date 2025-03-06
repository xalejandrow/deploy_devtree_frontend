import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { updateProfile } from "../api/DevTreeAPI";
import { User, SocialNetwork } from "../types";

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(['user'])!;  

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Actualizado Correctamente');
    },
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map(item => {
        const userLinks = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name);
        if (userLinks) {
          return { ...item, url: userLinks.url, enabled: userLinks.enabled };
        }
        return item;
    });
    setDevTreeLinks(updatedData);
    // console.log(devTreeLinks);
    // console.log(JSON.parse(user.links));

  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    
    setDevTreeLinks(updatedLinks);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no válida");
        }
      }
      return link;
    });
    setDevTreeLinks(updatedLinks);

    let updatedItems: SocialNetwork[] = [];

    const selectedSocialNetwork = updatedLinks.find((link) => link.name === socialNetwork);
    if(selectedSocialNetwork?.enabled){
        const id = links.filter(link => link.id).length + 1;
        if(links.some(link => link.name === socialNetwork)) {
            // console.log('YA EXISTE');
            updatedItems = links.map((link) => {
                if(link.name === socialNetwork){
                    return {
                        ...link,
                        enabled: true,
                        id
                    }
                } else {
                    return link;
                }
            });
        } else {
            const newItem = {
              ...selectedSocialNetwork,
              id
            }
            updatedItems = [...links, newItem];
        }
      
    }else{
      const indexToUpdate = links.findIndex((link) => link.name === socialNetwork);
      updatedItems = links.map((link) => {
        if(link.name === socialNetwork){
          return {
            ...link,
            id: 0,
            enabled: false
          }
        } else if(link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)){ 
          return {
            ...link,
            id: link.id - 1
          }
        } else{
          return link;
        }
      });
    //   console.log(indexToUpdate);
      
    }

    // console.log(updatedItems);
    
    // Almacenar en la base de datos
    queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedItems)
            };
        }
    );
  };

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}

        <button
            className="bg-cyan-400 p-2 text-lg w-full uppercase test-slate-600 rounded font-bold"
            onClick={() => mutate(queryClient.getQueryData(['user'])!)}
        >
            Guardar Cambios
        </button>
    </div>
  );
}
