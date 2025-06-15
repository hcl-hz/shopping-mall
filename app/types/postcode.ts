export interface DaumPostcode {
  open: () => void;
  embed: (container: HTMLElement) => void;
}

export interface PostcodeConstructor {
  new (options: PostcodeOptions): DaumPostcode;
}

export interface PostcodeOptions {
  oncomplete: (data: PostcodeData) => void;
  width?: string | number;
  height?: string | number;
}

export interface PostcodeData {
  zonecode: string;
  address: string;
  addressType: string;
  userSelectedType: string;
} 