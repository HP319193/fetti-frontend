type Mapper = {
  [key: string]: any;
  transform?: (args: any) => any;
  key?: string;
};

export const mapObject = (
  src: Record<string, any> = {},
  mapper: Record<string, Mapper> = {},
  params: any = {}
) => {
  let newObj: Record<string, any> = {};

  for (const [k, v] of Object.entries(mapper)) {
    if (k === "_keys") {
      if (Array.isArray(v)) {
        v.forEach((_k) => {
          newObj[_k] = src[_k];
        });
      }
    } else if (v?.hasOwnProperty("transform")) {
      if (v.key !== undefined && src.hasOwnProperty(v.key)) {
        newObj[k] = v.transform?.({ src, self: src[v.key], params });
      } else {
        newObj[k] = v.transform?.({ src, self: src[k], params });
      }
    } else if (v?.hasOwnProperty("key")) {
      if (v.key !== undefined && src.hasOwnProperty(v.key)) {
        newObj[k] = src[v.key];
      }
    } else {
      newObj[k] = v;
    }
  }

  return newObj;
};

export const mapObjects = (
  src: any[] = [],
  mapper: Record<string, Mapper> = {},
  params: any = {}
) => {
  return src.map((s) => {
    return mapObject(s, mapper, params);
  });
};
