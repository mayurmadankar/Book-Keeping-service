import {
  createLibrary,
  deleteLibrary,
  getAllLibraries,
  getLibraryById,
  updateLibrary
} from "./libraries.repo.js";

export const createLibraryController = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only admin users can create a library"
      });
    }

    const { name, address } = req.body;
    const result = await createLibrary(name, address);

    res.status(201).json({
      success: true,
      message: "Library created successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const getAllLibrariesController = async (req, res, next) => {
  try {
    const result = await getAllLibraries();

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No libraries found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Libraries fetched successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const getLibraryByIdController = async (req, res, next) => {
  try {
    const result = await getLibraryById(req.params.id);

    if (!result || !result.library) {
      return res.status(404).json({
        success: false,
        message: "Library not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Library details fetched successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const updateLibraryController = async (req, res, next) => {
  try {
    const result = await updateLibrary(req.params.id, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Library not found or update failed"
      });
    }
    res.status(200).json({
      success: true,
      message: "Library updated successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const deleteLibraryController = async (req, res, next) => {
  try {
    const result = await deleteLibrary(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Library not found or could not be deleted"
      });
    }
    res.status(200).json({
      success: true,
      message: "Library deleted successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
