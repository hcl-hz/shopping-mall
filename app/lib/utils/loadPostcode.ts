interface DaumWindow extends Window {
  daum?: {
    Postcode: PostcodeConstructor;
  };
}

interface PostcodeConstructor {
  new (options: PostcodeOptions): PostcodeInstance;
}

interface PostcodeInstance {
  open(): void;
}

interface PostcodeOptions {
  oncomplete: (data: PostcodeData) => void;
  width?: number;
  height?: number;
}

interface PostcodeData {
  zonecode: string;
  address: string;
  addressType: string;
  userSelectedType: string;
}

export function loadPostcode(): Promise<PostcodeConstructor> {
  return new Promise((resolve) => {
    const windowWithDaum = window as DaumWindow;
    
    if (windowWithDaum.daum?.Postcode) {
      return resolve(windowWithDaum.daum.Postcode);
    }

    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => resolve(windowWithDaum.daum!.Postcode);
    document.head.appendChild(script);
  });
}