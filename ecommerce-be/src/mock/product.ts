export function generateProductList(length) {
  /**
   * Tạo ra một danh sách sản phẩm với thông tin về ảnh và tên.
   *
   * @param {number} length - Độ dài của danh sách sản phẩm.
   * @returns {Array<{ _id: string, idReadable: string, name: string, slug: string, images: string[], price: number, stock: number, description: string }>} - Danh sách sản phẩm.
   */
  const imagesList = [
    'https://topxedap.com/wp-content/uploads/2021/03/csbike-12-inch-xanh-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/04/z5850235370660_252bbe1e2cacbc0c6ea41416528a32be-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2020/10/Photoroom-20241207_100418-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2024/09/Photoroom-20241001_111743_4-e1727757408293-900x771.png',
    'https://topxedap.com/wp-content/uploads/2021/04/csbike-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2020/09/IMG_20220402_162103-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2020/09/Photoroom-20250101_163648-1-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2025/02/Photoroom-20250225_092423-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/05/z3240545944685_b664d0185da5bb233e52b2eb05dfe79f-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/04/z5850235370660_252bbe1e2cacbc0c6ea41416528a32be-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2024/09/Photoroom-20241001_110814-900x771.png',
    'https://topxedap.com/wp-content/uploads/2021/04/IMG_20220406_163546-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2024/09/Photoroom-20241001_110851-900x771.png',
    'https://topxedap.com/wp-content/uploads/2020/11/csbike-sport-xanh-12-2-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/04/IMG_20220329_142402-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/04/csbike-sport-xanh-las12-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/z6298163025471_a8d0fb9eca9fa77dd240c20a6559aecd-1-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2022/04/IMG_20220406_160838-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2022/04/IMG_20220407_152528-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2024/10/Photoroom-20241005_090753-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2020/09/IMG_20220819_141826-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2020/09/IMG_20220510_141543-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2020/09/IMG_20220405_145811-1-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2022/04/IMG_20220407_152528-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/IMG_20220530_165910-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/2-600x400-1.jpg',
    'https://topxedap.com/wp-content/uploads/2021/05/Photoroom-20241031_231736-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/05/IMG_20220331_161858-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/11/IMG_20220401_165314-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2022/04/IMG_20220406_160838-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/IMG_20220530_170015-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2022/03/Photoroom-20241001_095700-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2022/04/z6314419598918_1bf6f731199c994fca5b272ef2a7bad9-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/10/Photoroom-20241207_100235-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2022/07/92kaz0l5-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/Photoroom-20250227_180346-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/z2378563440596_5b21c19840d4da1e3e842354a8615de3-e1615709603666-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/Photoroom-20250227_180304-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/05/z2493454170635_8c0279f1415a3324d7ce4023a459a899-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/05/IMG_20220401_163357-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2022/03/IMG_20220326_125044-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/IMG_20220326_124950-1-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/12/Photoroom-20241001_095611-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2020/10/z6306798571428_54b514b2199dc9bec261a62f260fd14f-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2024/09/shukyo-super-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2024/10/xaming-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2025/02/z6314419609014_5ae36c38b9100af286bb040612809fb4-2-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2025/02/Photoroom-20250225_092610-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2020/10/z6306798571428_54b514b2199dc9bec261a62f260fd14f-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/04/IMG_20220401_163357-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2020/11/IMG_20220401_155039-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/z2379513839695_884009227a10c1a3d8095415331d3942-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/IMG_20221212_170114-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/11/z6306716962756_c8c36184f6740243404a7860d6be49d2-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2022/03/Photoroom-20241001_095700-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2024/10/s3-16-inch-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/03/xaming-BMX-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2025/02/Xaming-nu-2024-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2021/10/IMG_20220724_141809-scaled-900x771.jpg',
    'https://topxedap.com/wp-content/uploads/2025/02/z6306798558340_a2694a106d2860c015496c18cadccf7c-2-900x771.jpg',
  ];

  const nameList = [
    'Xe đạp trẻ em CSBIKE 1 sườn 12 inch  – Xanh',
    'Xe đạp SHUKYO nhện 12 inch – Vàng',
    'Xe đạp trẻ em 12 inch XAMING AB – Hồng',
    'Xe đạp trẻ em SHUKYO nhện 12 inch đỏ',
    'Xe Đạp Trẻ Em Công Chúa 16 inch – Hồng Đậm',
    'Xe Đạp Trẻ Em Công Chúa 16 inch – Hồng Nhạt',
    'Xe đạp trẻ em SKUKYO nhện 12 inch xanh',
    'Xe đạp bé gái ELSA – 12 inch',
    'Xe Đạp Trẻ Em 14 inch XAMING 1 Sườn cao cấp – Hồng',
    'Xe đạp trẻ em SKUKYO nhện 14 inch – Vàng',
    'Xe Đạp Trẻ Em Công Chúa 12 inch – Hồng Đậm',
    'Xe Đạp Trẻ Em XAMING X4 Xanh Đỏ – 12 Inch',
    'Xe Đạp Bé Gái 12 inch – Tím',
    'Xe đạp trẻ em CS BIKE Xanh – 12 inch',
    'CS BIKE SPORT tay lái ngang 12 inch – Đỏ',
    'CS BIKE SPORT tay lái ngang 12inch – Lính',
    'Xe Đạp XAMING 12 Inch Tay Ngang – Xanh Đỏ',
    'Xe Đạp Trẻ Em 12 inch XAMING XM03 – Hồng',
    'Xe Đạp Trẻ Em XAMING X4 – 14 inch',
    'Xe đạp trẻ em SHUKYO nhện 16 inch xanh',
    'Xe đạp trẻ em 12 inch SPORT Baga – Đỏ',
    'Xe đạp trẻ em 12 inch SPORT Baga – Xanh dương',
    'Xe đạp trẻ em 12 inch SPORT Baga – Lính',
    'Xe Đạp Trẻ Em 16 inch XAMING 2021 – Đỏ',
    'Xe đạp trẻ em Xaming 12 inch – Xanh',
    'Xe đạp trẻ em Xaming 12 inch – Đỏ',
    'Xe Đạp Trẻ Em 16 inch XAMING XM13 2024 – Lính',
    'Xe Đạp Trẻ Em 16 inch XAMING AB – Tím',
    'Xe Đạp Trẻ Em 16 inch XAMING AB – Hồng',
    'Xe Đạp Trẻ Em 14 inch XAMING 2021 Nữ – Hồng',
    'Xe Đạp Trẻ Em 16 inch XAMING 2 Sườn – Xanh',
    'Xe Đạp Bé Gái XDD 16 Inch Hồng',
    'Xe Đạp Bé Gái XAMING XM03 Tím – 14 Inch',
    'Xe Đạp Trẻ Em SHUKYO K2 Xanh 20 Inch',
    'Xe đạp trẻ em Xaming 09 hồng 2024 – 12 inch',
    'Xe Đạp Thể Thao XAMING Tay Ngang Xanh 16 Inch',
    'Xe Đạp Trẻ Em 18 inch XAMING 2021 Nam- Đỏ',
    'Xe Đạp Trẻ Em 18 inch XAMING 2021 – Xanh',
    'Xe Đạp Trẻ Em 16 inch XAMING 2021 Nữ – Tím',
    'Xe Đạp Trẻ Em 16 inch XAMING XM03 – Hồng',
    'Xe đạp trẻ em Xaming 14 inch – Xanh',
    'Xe đạp trẻ em Xaming 14 inch – Đỏ',
    'Xe đạp trẻ em SHUKYO S3 hồng 12 inch',
    'Xe đạp trẻ em Xaming 09 hồng 2024 – 14 inch',
    'Xe đạp trẻ em SHUKYO nhện 16 inch đỏ',
    'Xe đạp bé gái 16 inch Xaming 09 2024 – Xanh',
    'Xe đạp XAMING nữ 2025 kem – 12 inch',
    'Xe đạp trẻ em SHUKYO S3 – 14 inch',
    'Xe đạp bé gái 16 inch Xaming 09 2024 – Hồng',
    'Xe đạp trẻ em Xaming XM03 hồng – 18 inch',
    'Xe Đạp Trẻ Em 16 inch CS BIKE 2024 – Xanh',
    'Xe đạp trẻ em Xaming 18 inch – Đỏ',
    'Xe Đạp Địa Hình 16 inch CS BIKE 2024 – Đỏ',
    'Xe đạp trẻ em XAMING sườn vuông hồng – 16 inch',
    'Xe Đạp Bé Gái XDD 18 Inch Hồng',
    'Xe đạp trẻ em SHUKYO S3 hồng 16 inch',
    'Xe Đạp Thể Thao XAMING BMX Đỏ – 16 Inch',
    'Xe đạp XAMING nữ 2025 hồng – 16 inch',
    'Xe đạp trẻ em XAMING XM03 hồng – 20 inch',
    'Xe đạp XAMING C1 2025 hồng – 14 inch',
  ];

  const categoriesList = [
    '67d3cd0847a0b00cce86ae86',
    '67d3cd1147a0b00cce86ae89',
    '67d3cd1547a0b00cce86ae8c',
    '67d3cd1c47a0b00cce86ae8f',
    '67d3cd1e47a0b00cce86ae92',
    '67d3cd2447a0b00cce86ae95',
    '67d3cd4247a0b00cce86ae98',
    '67d3cd4e47a0b00cce86ae9b',
    '67d3cd5747a0b00cce86ae9e',
    '67d3cd6247a0b00cce86aea1',
    '67d3cd6c47a0b00cce86aea4',
    '67d3cd8c47a0b00cce86aea7',
    '67d3cd8f47a0b00cce86aeaa',
    '67d3cd9d47a0b00cce86aead',
    '67d3cda547a0b00cce86aeb0',
  ];

  const textTemplalte = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum tortor in augue bibendum volutpat. Aliquam erat volutpat. Nunc volutpat consectetur ante vel posuere. Sed a bibendum tellus. Nunc nec fringilla odio. Morbi egestas volutpat dui iaculis maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse mollis diam lectus, nec egestas sem pharetra non. Fusce ut sem ac augue pharetra sollicitudin at quis sem. In hac habitasse platea dictumst.

Cras nec odio in risus suscipit laoreet consectetur eget felis. Mauris laoreet dignissim sem in vulputate. Morbi eu facilisis nibh, id luctus ligula. Suspendisse turpis urna, convallis non sollicitudin vitae, suscipit nec arcu. Etiam placerat purus quis varius fringilla. Cras vitae lectus lacinia, scelerisque arcu sit amet, bibendum erat. Donec in tristique diam, in luctus massa. Integer eu leo eros. In nec dapibus risus, sed mollis lorem. Aliquam a efficitur tortor. Maecenas rhoncus ante vitae turpis gravida, vel eleifend risus efficitur. Nunc convallis iaculis metus vitae feugiat.

Aliquam erat volutpat. Quisque dictum, orci vel consequat ultrices, leo lectus luctus felis, nec ullamcorper justo nisi ut nulla. Nulla commodo massa vel nunc rutrum scelerisque. Cras vestibulum mauris quis scelerisque laoreet. Morbi porta augue condimentum risus vestibulum, eu maximus ante hendrerit. Sed pulvinar magna purus, id porttitor erat condimentum ut. Quisque porttitor condimentum arcu non volutpat. Donec nec nisl id orci tempus iaculis. Etiam finibus dolor vel feugiat tristique. Praesent ornare a elit eu placerat.

Fusce posuere vel diam in dapibus. Morbi faucibus tortor non scelerisque auctor. Sed varius luctus lectus in convallis. Phasellus ullamcorper eleifend venenatis. Maecenas sollicitudin diam nec velit molestie, eu venenatis arcu rutrum. Praesent hendrerit pellentesque porttitor. Sed efficitur eget lorem id dapibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ac ipsum vitae dolor ultricies ultricies. Praesent facilisis venenatis ullamcorper. Praesent et eros sed quam semper fermentum eu et lorem.

Vivamus non velit porttitor, lacinia diam at, eleifend eros. Aenean sodales eros vel porta congue. Mauris ut lectus ut lorem sollicitudin sodales. In ut sapien at elit lacinia pulvinar a eu dui. Nunc tincidunt sollicitudin velit, ut molestie elit varius sit amet. Mauris purus nunc, blandit nec mauris ut, bibendum posuere tortor. Donec volutpat fringilla fringilla. Phasellus a sapien posuere, maximus quam sit amet, viverra ex. Proin sit amet auctor dui. Integer at tincidunt nibh. Fusce et tempor lectus.

Aenean id bibendum neque. Quisque sodales gravida interdum. Pellentesque porta interdum magna, eget tristique lorem fringilla id. Morbi velit sem, hendrerit et urna at, rhoncus dapibus eros. Sed commodo ex purus, euismod pellentesque tellus faucibus a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras condimentum efficitur risus, at imperdiet velit fringilla et. Sed congue, mi vel scelerisque facilisis, eros lectus egestas ipsum, non scelerisque diam augue et diam. Proin tempus, nibh tincidunt scelerisque consequat, felis velit scelerisque sem, nec dictum ante dolor eget tortor. Cras ut risus ante. Aenean facilisis ut tortor a egestas.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus vel viverra mi. Nullam rhoncus nulla in lobortis rhoncus. Suspendisse sagittis pulvinar enim eget varius. Suspendisse ultricies tempus est vitae euismod. Nullam molestie, leo dictum congue varius, justo eros euismod tellus, eget egestas eros lacus sit amet quam. Pellentesque a enim faucibus, fringilla tortor ut, tempus quam. Aenean ac neque at dolor consequat pulvinar in vitae urna. Nullam a ante et tellus ullamcorper volutpat ut eu nunc. Aliquam erat volutpat. In condimentum vulputate purus quis egestas. In auctor, nunc ut rhoncus placerat, nibh dui posuere velit, vel fringilla arcu velit non leo. Vestibulum eu facilisis neque, sed feugiat nisi. Donec commodo metus neque, nec porta ipsum maximus a.

Donec eleifend neque at nunc condimentum, eget posuere tellus semper. Proin aliquam arcu eros, sit amet luctus nulla tristique nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam id magna lacus. Vestibulum tincidunt id turpis non facilisis. In sed tempor ex, sollicitudin luctus quam. Aenean dictum congue faucibus. Sed ut finibus enim. Maecenas congue diam velit, eu sollicitudin sem pharetra ut. Mauris id ipsum at ipsum maximus suscipit mattis non arcu. Curabitur dictum turpis libero, finibus sagittis leo accumsan vitae. Vivamus porta felis sit amet velit sodales consectetur. Maecenas arcu sem, suscipit vitae fringilla sed, fermentum at lorem. Phasellus consectetur sit amet diam non rhoncus.

Donec tempus sit amet nibh eget vehicula. Fusce tempus sagittis dapibus. Maecenas vitae quam nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis ex tellus, suscipit a scelerisque non, suscipit nec purus. Phasellus ut nisi posuere, congue libero pharetra, ornare nulla. Morbi venenatis augue purus, vel euismod elit pellentesque eu. Aenean euismod eu magna in fermentum. Suspendisse laoreet porta mi accumsan consequat. Nunc vel massa urna. Maecenas eu pellentesque dui. Proin vitae bibendum enim, eget dignissim arcu. Donec ultricies id odio eu mollis. Nunc efficitur, diam at scelerisque posuere, massa neque vestibulum lacus, dictum volutpat dui velit sed mi.

Nunc tincidunt a ligula nec venenatis. Nullam laoreet ipsum ipsum, et facilisis orci pharetra sed. Vestibulum fermentum, est in vestibulum ultricies, orci turpis congue ligula, vel ornare lectus justo sit amet ante. In in neque ultrices, mattis lorem in, vestibulum enim. Duis vel risus malesuada velit eleifend condimentum. Nunc ultricies leo molestie eros molestie, at accumsan arcu blandit. Etiam vehicula nunc id viverra ornare. Nulla eu mauris eu sem facilisis tempus ut non sem. Ut vitae urna ex. Aenean mollis pellentesque laoreet. Aenean neque velit, tristique sit amet eleifend ac, interdum in turpis. Pellentesque lacinia ornare dignissim. Mauris sit amet leo lacus. Vestibulum tempus egestas massa semper bibendum. Quisque bibendum dui quis neque tristique, eget laoreet enim aliquet. Nunc auctor luctus metus volutpat pharetra.`;

  const productList = [];
  for (let i = 0; i < length; i++) {
    const product = {
      idReadable: generateIdReadable(i + 1),
      name: getRandomOne(nameList),
      slug: `product-${i + 1}`,
      images: getRandomImages(imagesList, 3, 5),
      price: getRandomPrice(1000, 10000),
      stock: getRandomStock(1, 1000),
      description: textTemplalte,
      categories: [getRandomOne(categoriesList)],
    };
    productList.push(product);
  }

  return productList;
}

function generateIdReadable(currentNumber) {
  // Convert the number to a string and pad with leading zeros
  const paddedNumber = Number(currentNumber).toString().padStart(5, '0');
  // Return the formatted idReadable
  return `PRO${paddedNumber}`;
}

function getRandomImages(imagesList, minLength, maxLength) {
  /**
   * Chọn ngẫu nhiên một số lượng ảnh từ danh sách ảnh.
   *
   * @param {string[]} imagesList - Danh sách ảnh.
   * @param {number} minLength - Số lượng ảnh tối thiểu.
   * @param {number} maxLength - Số lượng ảnh tối đa.
   * @returns {string[]} - Danh sách ảnh được chọn ngẫu nhiên.
   */
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  return [...imagesList].sort(() => Math.random() - 0.5).slice(0, length);
}

function getRandomOne(list) {
  /**
   * Chọn ngẫu nhiên một phần tử từ danh sách.
   *
   * @param {string[]} list - Danh sách phần tử.
   * @returns {string} - Phần tử được chọn ngẫu nhiên.
   */
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomPrice(min, max) {
  /**
   * Tạo ra một giá sản phẩm ngẫu nhiên trong khoảng [min, max].
   *
   * @param {number} min - Giá sản phẩm tối thiểu.
   * @param {number} max - Giá sản phẩm tối đa.
   * @returns {number} - Giá sản phẩm ngẫu nhiên.
   */
  return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
}

function getRandomStock(min, max) {
  /**
   * Tạo ra một số lượng hàng tồn kho ngẫu nhiên trong khoảng [min, max].
   *
   * @param {number} min - Số lượng hàng tồn kho tối thiểu.
   * @param {number} max - Số lượng hàng tồn kho tối đa.
   * @returns {number} - Số lượng hàng tồn kho ngẫu nhiên.
   */
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
