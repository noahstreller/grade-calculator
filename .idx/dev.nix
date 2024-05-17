{ pkgs }: {
  channel = "stable-23.11";
  services.docker.enable = true;
  
  packages = [
    pkgs.nodejs_20
  ];
  idx.extensions = [

  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npx"
          "vercel"
          "dev"
          "--port"
          "9000"
        ];
        manager = "web";
      };
    };
  };
}
